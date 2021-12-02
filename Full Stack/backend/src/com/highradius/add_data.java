	package com.highradius;
	import java.sql.*;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class add_data
 */
@WebServlet("/add_data")
public class add_data extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String user = "root";
	private static final String password = "1234";
	static final String jdbc="com.mysql.cj.jdbc.Driver";
	static final String dburl = "jdbc:mysql://localhost:3306/highradius"; 
	
    public add_data() {
        super();
        // TODO Auto-generated constructor stub
    }

	


	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection connection  = null;
		String name_customer = request.getParameter("name_customer");
		String cust_number = request.getParameter("cust_number");
		String invoice_id = request.getParameter("invoice_id");
		String due_in_date = request.getParameter("due_in_date");
		String total_open_amount = request.getParameter("total_open_amount");
		String notes = request.getParameter("notes");
		int executionStatus = 0;
		String jsonString=null;
		PreparedStatement state = null;
		List<add_pojo> demoList = new ArrayList<>();
		add_pojo demo = new add_pojo();
			try 
			{
			
			Class.forName(jdbc);
			connection = DriverManager.getConnection(dburl,user,password);
			state = connection.prepareStatement("insert into invoice_details (name_customer,cust_number,invoice_id,due_in_date,total_open_amount,notes) values (?,?,?,?,?,?) ");
			state.setString(1, name_customer);
			state.setString(2, cust_number);
			state.setString(3, invoice_id);
			state.setString(4, total_open_amount);
			state.setString(5, due_in_date);
			state.setString(6, notes);
			executionStatus=state.executeUpdate();
			if(executionStatus>=1) {
				demo.setExecutionStatus("true");
				demo.setExecutionMessage("Data inserted Successfully");
			}else {
				demo.setExecutionStatus("false");
				demo.setExecutionMessage("Data not inserted");
			}
			
			// add pojo to list
			//convert list to json
			//write json to response
			
			demoList.add(demo);
			String json_string = json_from_res(demoList);
			response.setContentType("application/json");
			try 
			{
				response.getWriter().write(json_string);
				
			}
			catch(IOException e)
			{
				e.printStackTrace();
			}
			
			state.close();
			connection.close();
			
			
			
			
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
	}
    
	private String json_from_res(List<add_pojo> resp)
    {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String json = gson.toJson(resp);
        return json;
        
    }

}
