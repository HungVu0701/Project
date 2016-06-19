/*
 * Copyright (C) 2010 Viettel Telecom. All rights reserved.
 * VIETTEL PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.viettel.model;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class HibernateUtils {

    /**
     * log tool.
     */
    private static Logger log = Logger.getLogger(HibernateUtils.class);
    /**
     * Hibernate SessionFactory.
     */
    private transient static SessionFactory sessionFactory;
    /**
     * error message .
     */
    private static final String TRANS_EX_MSG_TRANSNOTSTARTED = "Transaction not successfully started";

    static {
        try {
            Configuration dbConfig = new Configuration().configure("hibernate.cfg.xml");
            sessionFactory = dbConfig.buildSessionFactory();
        } catch (Throwable ex) {              
            log.error(ex);
	    ex.printStackTrace();
        }
    }

    /**
     * Private constructor : don't allow instanciation of this class
     */
    private HibernateUtils() {
    }

    /**
     * Init hibernate resource
     */
    public static void startup() {
        //Duoc goi khi bat dau start web app
        log.info("Khởi tạo HibernateUtil");
    }

    /**
     * Destroy hibernate resource
     */
    public static void shutdown() {
        log.info("Destroy HibernateUtil");
        sessionFactory.close();
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static Session getSession() {
        return getSessionFactory().getCurrentSession();
    }

    public static Session getCurrentSession() {
        if (getSessionFactory() == null) {
            try {
                Configuration dbConfig = new Configuration().configure("hibernate.cfg.xml");
                sessionFactory = dbConfig.buildSessionFactory();
            } catch (Throwable ex) {
                log.error(ex);
		ex.printStackTrace();
            }
        }
        return getSessionFactory().getCurrentSession();
    }

    /**
     * Get hibernate session and begin transaction,
     *
     * @return Hibernate session bound to thread
     */
    public static Session getSessionAndBeginTransaction() {
        Session session = getCurrentSession();
        session.beginTransaction();
        return session;
    }

    /**
     * Commit current sessions
     *
     * @return sessions need to rollback
     * @throws Throwable Throwable
     */
    public static Session commitCurrentSessions() {
        //sessions need rollback
        Session sessionsToRollBack = null;

        Session session = getCurrentSession();
        if (session.isOpen()) {
            Transaction t = session.getTransaction();
            /*
             * Nếu Transaction đã được begin và không có lỗi nào trong lần commit trước đó
             * (hasExceptionDuringCommit = false)
             *
             * Thực hiện commit transaction của session tiếp theo
             * Nếu có lỗi đặt cờ (hasExceptionDuringCommit = true).
             * không commit nữa mà gán session tiếp theo vào biến localSessionsWillRollBack
             *
             * hasExceptionDuringCommit = true:
             * không commit nữa mà gán session tiếp theo vào biến localSessionsWillRollBack
             */
            if (t.isActive()) {
                try {
                    t.commit();
                } catch (Throwable ex) {
                    ex.printStackTrace();
                    sessionsToRollBack = session;
                    log.error("Co loi xay ra khi commit transaction cua session", ex);
                }
            }
        }
        return sessionsToRollBack;
    }

    /**
     * rollback session
     *
     * @param sessionToRollBack sessions need to rollback
     */
    public static void rollBackSession(Session sessionToRollBack) {
        if (sessionToRollBack != null) {
            if (sessionToRollBack.isOpen()) {
                Transaction t = sessionToRollBack.getTransaction();
                try {
                    t.rollback();
                } catch (Exception ex) {
                    if (ex.getMessage().equals(TRANS_EX_MSG_TRANSNOTSTARTED)) {
                        //Bỏ qua lỗi không rollback được khi transaction được begin;
                        log.info("Không rollback do chưa được khởi tạo");
                    } else {
                        log.error("Có lỗi xảy ra khi rollback session", ex);
                    }
                } catch (Throwable ta) {
                    log.error("Có lỗi xảy ra khi rollback session", ta);
                }
            }
        }
    }

    /**
     * Close current sessions
     *
     * @throws Exception Exception
     */
    public static void closeCurrentSession() {
        try {
            if (getCurrentSession().isOpen()) {
                getCurrentSession().close();
            }
        } catch (Exception ex) {
            log.error("Lỗi khi đóng session", ex);
            throw new RuntimeException("Lỗi khi đóng session", ex);
        }
    }

    public static String getPointString(double lon, double lat) {
        String str = "POINT(";
        str += lon;
        str += " ";
        str += lat;
        str += ")";
        return str;
    }
}
