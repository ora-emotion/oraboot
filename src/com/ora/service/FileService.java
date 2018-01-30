package com.ora.service;

import com.ora.po.Upfile;

import java.util.List;

public interface FileService {
    public int addFile(Upfile upfile);
    public String findFileName(Integer file_id);
    public int fileRemove(Integer file_id);
    public List<Upfile> findFile(Integer cust_cnumber);
    //根据fid查询文件
    public Upfile findFileByFid(Integer file_id);
    public Upfile findFileId(String fname);
    //更新用户文件下载次数
    public Integer updateDownNum(Upfile upfile);
}
