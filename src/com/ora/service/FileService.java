package com.ora.service;

import com.ora.po.Upfile;

public interface FileService {
    public int addFile(Upfile upfile);
    public String findFileName(Integer file_id);
    public int fileRemove(Integer file_id);
    public Upfile findFile(Integer file_id);
    public Upfile findFileId(String fname);
}
