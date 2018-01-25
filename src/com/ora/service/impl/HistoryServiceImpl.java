package com.ora.service.impl;

import com.ora.dao.HistoryDao;
import com.ora.po.History;
import com.ora.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("historyService")
@Transactional
public class HistoryServiceImpl implements HistoryService{
    //依赖注入Dao
    @Autowired
    private HistoryDao historyDao;

    @Override
    public List<History> selectAllHistory() {
        return historyDao.selectAllHistory();
    }

    @Override
    public List<History> selectHistoryByDid(Integer udepartment) {
        return historyDao.selectHistoryByDid(udepartment);
    }
}
