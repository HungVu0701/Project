/*
 * Copyright (C) 2010 Viettel Telecom. All rights reserved.
 * VIETTEL PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.viettel.model;

import java.io.Serializable;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.LockMode;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Example;
import java.lang.reflect.ParameterizedType;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;

/**
 * Implements the generic CRUD data access operations using Hibernate APIs.
 * <p>
 * To write a DAO, subclass and parameterize this class with your persistent
 * class. Of course, assuming that you have a traditional 1:1 appraoch for
 * Entity:DAO design.
 * <p>
 * You have to inject a current Hibernate <tt>Session</tt> to use a DAO.
 * Otherwise, this generic implementation will use
 * <tt>HibernateUtils.getSessionFactory()</tt> to obtain the curren
 * <tt>Session</tt>.
 *
 * @author thangdd8@viettel.com.vn
 * @since Apr 12, 2010
 * @param <>> BO Class
 * @param <>D> ID field
 * @version 1.0
 */
public abstract class GenericHibernateDAO<T, ID extends Serializable> {

    /**
     * persistentClass.
     */
    private Class<T> persistentClass;

    /**
     * Contructor
     */
    public GenericHibernateDAO() {
        this.persistentClass = (Class<T>) ((ParameterizedType) getClass().
                getGenericSuperclass()).getActualTypeArguments()[0];
    }

    protected Session getSession() {
        return this.getSession("default");
    }

    protected Session getSession(String sessionName) {
        Session session = HibernateUtils.getSessionAndBeginTransaction();
        return session;
    }

    public Class<T> getPersistentClass() {
        return persistentClass;
    }

    /**
     * Return the persistent instance of the given entity class with the given
     * identifier, assuming that the instance exists.
     *
     * @param sessionName Name of hibernate session
     * @param id A valid identifier of an existing persistent instance of the
     * class
     * @param lock Lock the entity?
     * @return An entity
     */
    @SuppressWarnings("unchecked")
    public T findById(String sessionName, ID id, boolean lock) {
        try {
            T entity;
            if (lock) {
                entity = (T) getSession(sessionName).get(getPersistentClass(), id, LockMode.UPGRADE);
            } else {
                entity = (T) getSession(sessionName).get(getPersistentClass(), id);
            }
            return entity;
        } catch (RuntimeException e) {
            throw e;
        } finally {
            this.releaseResource();
        }
    }

    /**
     * Retrieve all entity in database table
     *
     * @param sessionName Name of hibernate session
     * @return List of all entity
     */
    @SuppressWarnings("unchecked")
    public List<T> findAll(String sessionName) {
        return findByCriteria(sessionName);
    }

    /**
     * find by Example with enableLike and ignoreCase options This method may
     * throw a HibernateException
     *
     * @param sessionName Name of hibernate session
     * @param exampleInstance a object to make find conditions
     * @param excludeProperty Exclude a particular named property
     * @return List of entity that match conditions
     */
    @SuppressWarnings("unchecked")
    public List<T> findByExample(String sessionName, T exampleInstance, String... excludeProperty) {
        try {
            Criteria crit = getSession(sessionName).createCriteria(getPersistentClass());
            Example example = Example.create(exampleInstance);
            for (String exclude : excludeProperty) {
                example.excludeProperty(exclude);
            }
            crit.add(example);
            return crit.list();
        } catch (RuntimeException e) {
            throw e;
        } finally {
            this.releaseResource();
        }
    }

    /**
     * find by Example with enableLike and ignoreCase options This method may
     * throw a HibernateException
     *
     * @param sessionName Name of hibernate session
     * @param exampleInstance a object to make find conditions
     * @param enableLike Use the "like" operator for all string-valued
     * properties
     * @param ignoreCase Ignore case for all string-valued properties
     * @param excludeProperty Exclude a particular named property
     * @return List of entity that match conditions
     */
    @SuppressWarnings("unchecked")
    public List<T> findByExample(String sessionName, T exampleInstance, boolean enableLike, boolean ignoreCase,
            String... excludeProperty) {
        try {
            Criteria crit = getSession(sessionName).createCriteria(getPersistentClass());
            Example example = Example.create(exampleInstance);
            for (String exclude : excludeProperty) {
                example.excludeProperty(exclude);
            }
            if (enableLike) {
                example.enableLike(MatchMode.ANYWHERE);
            }
            if (ignoreCase) {
                example.ignoreCase();
            }

            crit.add(example);
            return crit.list();
        } catch (RuntimeException e) {
            throw e;
        } finally {
            this.releaseResource();
        }
    }

    /**
     * Save an entity to database This method may throw a HibernateException
     *
     * @param sessionName Name of hibernate session
     * @param entity Entity to save
     * @return Entity that saved in PersistentContext
     */
    @SuppressWarnings("unchecked")
    public T makePersistent(String sessionName, T entity) {
        try {
            getSession(sessionName).saveOrUpdate(entity);
            return entity;
        } catch (RuntimeException e) {
            throw e;
        } finally {
            this.releaseResource();
        }
    }

    /**
     * Delete an entity This method may throw a HibernateException
     *
     * @param sessionName Name of hibernate session
     * @param entity Entity to delete
     */
    public void makeTransient(String sessionName, T entity) {
        try {
            getSession(sessionName).delete(entity);
        } catch (RuntimeException e) {
            throw e;
        } finally {
            this.releaseResource();
        }
    }

    /**
     * flush PersitentContext to database
     *
     * @param sessionName Name of hibernate session This method may throw a
     * HibernateException
     */
    public void flush(String sessionName) {
        getSession(sessionName).flush();
    }

    /**
     * Clear the PersitentContext
     *
     * @param sessionName Name of hibernate session This method may throw a
     * HibernateException
     */
    public void clear(String sessionName) {
        getSession(sessionName).clear();
    }

    /**
     * find by Criterion with firstResult and maxResult limit This method may
     * throw a HibernateException
     *
     * @param sessionName Name of hibernate session
     * @param criterion Find conditions
     * @return List of entity that match conditions
     */
    @SuppressWarnings("unchecked")
    protected List<T> findByCriteria(String sessionName, Criterion... criterion) {
        return this.findByCriteria(sessionName, -1, -1, null, null, criterion);
    }

    /**
     * find by Criterion with firstResult and maxResult limit This method may
     * throw a HibernateException
     *
     * @param sessionName Name of hibernate session
     * @param firstResult The position of the first result to retrieve. Zero
     * mean this argument will be ignored
     * @param maxResult The position of the last result to retrieve. Zero mean
     * this argument will be ignored
     * @param order
     * @param projectionList
     * @param criterion Find conditions
     * @return List of entity that match conditions
     */
    @SuppressWarnings("unchecked")
    protected List<T> findByCriteria(String sessionName, int firstResult, int maxResult,
            Order order, ProjectionList projectionList, Criterion... criterion) {
        try {
            Criteria crit = getSession(sessionName).createCriteria(getPersistentClass());
            if (criterion != null) {
                for (Criterion c : criterion) {
                    crit.add(c);
                }
            }
            if (firstResult >= 0) {
                crit.setFirstResult(firstResult);
            }
            if (maxResult >= 0) {
                crit.setMaxResults(maxResult);
            }
            if (order != null) {
                crit.addOrder(order);
            }
            if (projectionList != null) {
                crit.setProjection(projectionList);
            }
            List<T> result = crit.list();
            return result;
        } catch (RuntimeException e) {
            throw e;
        } finally {
            this.releaseResource();
        }
    }

    /**
     * find by Criterion with firstResult and maxResult limit This method may
     * throw a HibernateException
     *
     * @param firstResult The position of the first result to retrieve. Zero
     * mean this argument will be ignored
     * @param maxResult The position of the last result to retrieve. Zero mean
     * this argument will be ignored
     * @param criterion Find conditions
     * @return List of entity that match conditions
     */
    @SuppressWarnings("unchecked")
    protected List<T> findByCriteria(int firstResult, int maxResult, Criterion... criterion) {
        return this.findByCriteria("default", firstResult, maxResult, null, null, criterion);
    }

    /**
     * find by Criterion with firstResult and maxResult limit This method may
     * throw a HibernateException
     *
     * @param criterion Find conditions
     * @return List of entity that match conditions
     */
    @SuppressWarnings("unchecked")
    protected List<T> findByCriteria(Criterion... criterion) {
        return this.findByCriteria("default", criterion);
    }

    /**
     * find by Criterion with firstResult and maxResult limit This method may
     * throw a HibernateException
     *
     * @param criterion Find conditions
     * @return List of entity that match conditions
     */
    @SuppressWarnings("unchecked")
    protected List<T> findByCriteria(Order order, Criterion... criterion) {
        return this.findByCriteria("default", -1, -1, order, null, criterion);
    }

    @SuppressWarnings("unchecked")
    protected List<T> findByCriteria(ProjectionList projectionList, Criterion... criterion) {
        return this.findByCriteria("default", -1, -1, null, projectionList, criterion);
    }

    /**
     * Return the persistent instance of the given entity class with the given
     * identifier, assuming that the instance exists.
     *
     * @param id A valid identifier of an existing persistent instance of the
     * class
     * @param lock Lock the entity?
     * @return An entity
     */
    @SuppressWarnings("unchecked")
    public T findById(ID id, boolean lock) {
        return this.findById("default", id, lock);
    }

    /**
     * find by Example with enableLike and ignoreCase options This method may
     * throw a HibernateException
     *
     * @param exampleInstance a object to make find conditions
     * @param excludeProperty Exclude a particular named property
     * @return List of entity that match conditions
     */
    @SuppressWarnings("unchecked")
    public List<T> findByExample(T exampleInstance, String... excludeProperty) {
        return this.findByExample("default", exampleInstance, excludeProperty);
    }

    /**
     * find by Example with enableLike and ignoreCase options This method may
     * throw a HibernateException
     *
     * @param exampleInstance a object to make find conditions
     * @param enableLike Use the "like" operator for all string-valued
     * properties
     * @param ignoreCase Ignore case for all string-valued properties
     * @param excludeProperty Exclude a particular named property
     * @return List of entity that match conditions
     */
    @SuppressWarnings("unchecked")
    public List<T> findByExample(T exampleInstance, boolean enableLike, boolean ignoreCase,
            String... excludeProperty) {
        return this.findByExample("default", exampleInstance, enableLike,
                ignoreCase, excludeProperty);
    }

    /**
     * Save an entity to database This method may throw a HibernateException
     *
     * @param entity Entity to save
     * @return Entity that saved in PersistentContext
     */
    @SuppressWarnings("unchecked")
    public T makePersistent(T entity) {
        return this.makePersistent("default", entity);
    }

    /**
     * Delete an entity This method may throw a HibernateException
     *
     * @param entity Entity to delete
     */
    public void makeTransient(T entity) {
        this.makeTransient("default", entity);
    }

    /**
     * flush PersitentContext to database This method may throw a
     * HibernateException
     */
    public void flush() {
        this.flush("default");
    }

    /**
     * Clear the PersitentContext This method may throw a HibernateException
     */
    public void clear() {
        this.clear("default");
    }

    /**
     * Retrieve all entity in default database table
     *
     * @return List of all entity
     */
    @SuppressWarnings("unchecked")
    public List<T> findAll() {
        return this.findAll("default");
    }

    public int countAll() {
        try {
            Criteria criteria = getSession().createCriteria(getPersistentClass());
            criteria.setProjection(Projections.rowCount());
            int result = ((Long) criteria.uniqueResult()).intValue();
            return result;
        } catch (RuntimeException e) {
            throw e;
        } finally {
            this.releaseResource();
        }
    }

    protected void releaseResource() {
        Session session = HibernateUtils.commitCurrentSessions();
        if (session != null) {
            HibernateUtils.rollBackSession(session);
        }
        HibernateUtils.closeCurrentSession();
    }
}
