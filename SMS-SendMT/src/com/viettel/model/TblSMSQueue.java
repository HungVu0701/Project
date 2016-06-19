package com.viettel.model;

import java.util.Date;

public class TblSMSQueue  implements java.io.Serializable {


     private long gid;
     private String phone;
     private String content;
     private int status;
     private Date createdAt;
     private Date updatedAt;     

    public TblSMSQueue() {
    }

    public TblSMSQueue(String phone, String content, int status) {
        this.phone = phone;
        this.content = content;
        this.status = status;
    }

    public long getGid() {
        return gid;
    }

    public void setGid(long gid) {
        this.gid = gid;
    }
   
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

	
   

}


