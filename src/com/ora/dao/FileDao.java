package com.ora.dao;

import com.ora.po.Upfile;

public interface FileDao {
    //保存上传的文件信息
    public int addFile(Upfile upfile);
    //查询文件名
    public String findFileName(Integer file_id);
    //删除文件
    public int fileRemove(Integer file_id);
    //查询当前用户的文件
    public Upfile findFile(Integer file_id);
    //查询数据库中是否含有改文件
    public Upfile findFileId(String fname);
}
