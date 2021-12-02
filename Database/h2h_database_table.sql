USE `h2h_internship`;
DROP TABLE IF EXISTS `invoice_details`;

CREATE TABLE invoice_details(
   name_customer     VARCHAR(200) 
  ,cust_number       VARCHAR(200) 
  ,invoice_id        VARCHAR(200)  PRIMARY KEY
  ,total_open_amount VARCHAR(200) 
  ,due_in_date       VARCHAR(200)  
  ,predicted_date    VARCHAR(200)
  ,notes             VARCHAR(200) 
);