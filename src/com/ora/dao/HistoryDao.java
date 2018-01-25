package com.ora.dao;

import com.ora.po.History;

import java.util.List;

public interface HistoryDao {
    //查询所有备份记录
    public List<History> selectAllHistory();
    //根据部门id查询备份记录
    public List<History> selectHistoryByDid(Integer udepartment);
}
