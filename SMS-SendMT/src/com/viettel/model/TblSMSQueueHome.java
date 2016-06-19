/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.model;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author hungvx
 */
public class TblSMSQueueHome extends GenericHibernateDAO<TblSMSQueue, Long>{
    
    /**
     * log tool.
     */
    private static Logger log = Logger.getLogger(HibernateUtils.class);
    
    
    public static List<TblSMSQueue> getListSMS() {
        
        try {
            TblSMSQueueHome home = new TblSMSQueueHome();
            Criterion criterion = Restrictions.eq("status", 0);            
            return home.findByCriteria(criterion);
            
            //return home.findAll();
        } catch (RuntimeException re) {
            throw re;
        }
    }
    
    public static void update(List<TblSMSQueue> obj) {
        Transaction transaction = null;
        try {
            SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
            Session session = sessionFactory.getCurrentSession();
            transaction = session.beginTransaction();
            for (int i = 0; i < obj.size(); i++) {
                session.saveOrUpdate(obj.get(i));
            }
            session.flush();
            transaction.commit();
        } catch (RuntimeException re) {
            transaction.rollback();
            throw re;
        }
    }
   
}

