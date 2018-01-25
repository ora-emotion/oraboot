package com.ora.service;

import com.ora.po.History;

import java.util.List;

public interface HistoryService {
    public List<History> selectAllHistory();
    public List<History> selectHistoryByDid(Integer udepartment);
}
