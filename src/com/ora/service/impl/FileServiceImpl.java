package com.ora.service.impl;

import com.ora.dao.FileDao;
import com.ora.po.Upfile;
import com.ora.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("fileService")
@Transactional
public class FileServiceImpl implements FileService{
    @Autowired
    private FileDao fileDao;

    @Override
    public int addFile(Upfile upfile) {
        return fileDao.addFile(upfile);
    }

    @Override
    public String findFileName(Integer file_id) {
        return fileDao.findFileName(file_id);
    }

    public int fileRemove(Integer file_id){
        return fileDao.fileRemove(file_id);
    }

    @Override
    public List<Upfile> findFile(Integer cust_cnumber) {
        return fileDao.findFile(cust_cnumber);
    }

    @Override
    public Upfile findFileByFid(Integer file_id) {
        return fileDao.findFileByFid(file_id);
    }

    @Override
    public Upfile findFileId(String fname) {
        return fileDao.findFileId(fname);
    }

    @Override
    public Integer updateDownNum(Upfile upfile) {
        return fileDao.updateDownNum(upfile);
    }
}
