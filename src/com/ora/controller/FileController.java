package com.ora.controller;

import com.ora.po.Customer;
import com.ora.po.Upfile;
import com.ora.po.User;
import com.ora.service.FileService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.List;

@Controller
public class FileController {

    @Autowired
    private FileService fileService;

    //ajax文件上传
    @RequestMapping("/fileAjax")
    @ResponseBody
    public Boolean testAjax(@RequestBody Upfile file) {
        System.out.println(file.getFname());
        System.out.println(file);

        return false;
    }


    //执行文件上传
    @RequestMapping("/fileUpload")
    public String hanleFormUpload(@RequestParam("uname") String uname,
                                  @RequestParam("cust_cnumber") String cust_cnumber,
                                  @RequestParam("uploadfile")List<MultipartFile> uploadfile,
                                  HttpServletRequest request,
                                  Model model){

        Upfile upfile = new Upfile();
        String originalFilename = null;
        upfile.setUname(uname);
        upfile.setCust_cnumber(cust_cnumber);
        //判断上传文件是否存在
        if (!uploadfile.isEmpty() && uploadfile.size()>0){
            //循环输出上传的文件
            for (MultipartFile file : uploadfile){
                //获取上传文件的原始名称
                originalFilename = file.getOriginalFilename();
                upfile.setFname(originalFilename);
                //设置上传文件的保存地址目录
                String dirPath = request.getSession().getServletContext().getRealPath("/upload/");
                File filePath = new File(dirPath);
                //如果保存文件的地址不存在，就先创建目录
                if (!filePath.exists()){
                    filePath.mkdirs();
                }
                try{
                    //使用MultipartFile接口的方法完成文件上传到指定位置
                    file.transferTo(new File(dirPath + originalFilename));
                }catch (Exception e){
                    e.printStackTrace();
                    return "customer";
                }
            }
            Upfile upfile1 = fileService.findFileId(originalFilename);
            if (upfile1 != null){
                model.addAttribute("msg","已存在该文件");
            }else{
                int rows = fileService.addFile(upfile);
                if(rows>0){
                    model.addAttribute("msg","上文件成功");
                }
            }
        }else {
            model.addAttribute("msg","文件上传失败！！！");
        }
        return "customer";

    }

    //根据id查到文件名然后下载
    @RequestMapping("/fileDownload")
    public ResponseEntity<byte[]> fileDownload(HttpServletRequest request, HttpServletResponse response,Integer file_id) throws Exception{
        //指定要下载的文件所在路径
        String path = request.getSession().getServletContext().getRealPath("/upload/");
        String filename = fileService.findFileName(file_id);
        if (filename == null||filename.equals("")){
            request.setAttribute("msg","没有找到该文件，请确认后重试");
            request.getRequestDispatcher("/toCustomer").forward(request,response);
        }
        File file = new File(path+File.separator+filename);
        //对文件进行编码
        filename = this.getFilename(request,filename);
        //设置响应头
        HttpHeaders headers = new HttpHeaders();
        //通知浏览器以下载的方式打开文件
        headers.setContentDispositionFormData("attachment",filename);
        //定义以流的形式下载返回文件数据
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        //使用springmvc框架的ResponseEntity对象封装返回下载数据
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),headers, HttpStatus.OK);
    }


    //根据浏览器的不同进行编码设置，返回编码后的文件名
    public String getFilename(HttpServletRequest request, String filename) throws Exception{
        //IE不同版本User-Agent中出现的关键词
        String[] IEBrowserKeyWords = {"MSIE","Trident","Edge"};
        //获取请求头代理信息
        String userAgent = request.getHeader("User-Agent");
        for (String keyWord :IEBrowserKeyWords){
            if(userAgent.contains(keyWord)){
                //IE内核浏览器，同一为UTF-8编码显示
                return URLEncoder.encode(filename,"utf-8");
            }
        }
        //火狐等其他浏览器统一为ISO-8859-1编码
        return new String(filename.getBytes("UTF-8"),"iso-8859-1");
    }

    //删除文件
    @RequestMapping("/fileRemove")
    @ResponseBody
    public boolean deleteFile(@RequestBody Customer customer,HttpServletRequest request,Model model){
        Integer file_id = customer.getFile_id();
        String fname = fileService.findFileName(file_id);
        int rows = fileService.fileRemove(file_id);
        String path = request.getSession().getServletContext().getRealPath("/upload/");
        File file = new File(path+File.separator+fname);
        if (file.isFile() && file.exists() && rows>0) {
            file.delete();//"删除单个文件"+name+"成功！"
            model.addAttribute("msg","删除用户 "+customer.getCnumber()+" 的文件成功");
            return true;
        }else{
            //"删除单个文件"+name+"失败！"
            model.addAttribute("msg","删除文件失败");
            return false;
        }
    }

    //查询用户文件
    @RequestMapping("/findFile")
    @ResponseBody
    public Upfile findFile (@RequestBody Customer customer, HttpSession session){
        Integer file_id = customer.getFile_id();
        User user = (User) session.getAttribute("USER_SESSION");
        String uname = user.getUname();
        Upfile upfile = new Upfile(0,"没有文件",uname,"0","0000-00-00");
        if (file_id != 0){
            Upfile file = fileService.findFile(file_id);
            return file;
        }else{
            return upfile;
        }

    }
}
