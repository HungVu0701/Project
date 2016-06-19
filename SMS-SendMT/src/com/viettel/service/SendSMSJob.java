/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.service;

import com.viettel.model.TblSMSQueue;
import com.viettel.model.TblSMSQueueHome;
import java.util.Date;
import java.util.List;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import sendmt.MtStub;

/**
 *
 * @author Hung Vu
 */
public class SendSMSJob implements Job {

    public void execute(JobExecutionContext context)
            throws JobExecutionException {
        System.out.println(new Date() + " >>> Execute read DB and send SMS >>");
        List<TblSMSQueue> listSMS = TblSMSQueueHome.getListSMS();
        if (listSMS != null && !listSMS.isEmpty()) {
            for (TblSMSQueue sms : listSMS) {
                String phone = sms.getPhone();
                String content = sms.getContent();
                int result = sendMT(phone, content);
                if (result == 0) {
                    sms.setStatus(1);
                } else {
                    sms.setStatus(2);
                }
            }
            TblSMSQueueHome.update(listSMS);
        }

    }
    private static final MtStub stub = new MtStub(
            ConfigurationManagement.getInstance().getString("sms.url"), "http://tempuri.org/", ConfigurationManagement.getInstance().getString("sms.username"), ConfigurationManagement.getInstance().getString("sms.password"));

    /**
     *
     * @param receiver phone number in format "849xxxxxxxx" or "841xxxxxxxxx"
     * @param content
     * @return 0: success, other: fail
     */
    public static int sendMT(String receiver, String content) {
        //send param:  sessionId,  serviceId,  sender,  receiver,  contentType,  content,  status
        return stub.send("0",
                "0",
                ConfigurationManagement.getInstance().getString("sms.sender"),
                receiver,
                "0",
                content,
                "0");
    }
}
