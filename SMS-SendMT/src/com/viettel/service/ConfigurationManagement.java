package com.viettel.service;

import java.net.URL;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;

/**
 *
 * @author hungvx
 */
public class ConfigurationManagement {

    /**
     * log tool.
     */
   // private static Logger log = Logger.getLogger(ConfigurationManagement.class);
    private static transient PropertiesConfiguration configuration = null;
    private static final String CONFIG_FILE = "sms.conf";
    private static final String CONFIG_PATH = "conf/";

    private ConfigurationManagement() {
    }

    public static Configuration getInstance() {
        if (configuration == null) {
            try {
                final URL url = ConfigurationManagement.class.getClassLoader().getResource(CONFIG_PATH + CONFIG_FILE);
                //System.out.println(url);
                configuration = new PropertiesConfiguration(url);
                configuration.setAutoSave(true);                                
            } catch (ConfigurationException ex) {                
                //log.error("error while loading configuration file" + ex);
            }
        }
        return configuration;
    }
}
