package com.highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
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
 * Servlet implementation class edit_data
 */
@WebServlet("/edit_data")
public class edit_data extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String user = "root";
	private static final String password = "1234";
	static final String jdbc="com.mysql.cj.jdbc.Driver";
	static final String dburl = "jdbc:mysql://localhost:3306/highradius";
       
   
    public edit_data() {
        super();
        // TODO Auto-generated constructor stub
    }



    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection connection  = null;
		String invoice_id = request.getParameter("invoice_id");
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
			state = connection.prepareStatement("update invoice_details set total_open_amount=?,notes=? where invoice_id=? ");
			state.setString(1, total_open_amount);
			state.setString(2, notes);
			state.setString(3, invoice_id);
			executionStatus=state.executeUpdate();
			if(executionStatus>=1) {
				demo.setExecutionStatus("true");
				demo.setExecutionMessage("Data edited Successfully");
			}else {
				demo.setExecutionStatus("false");
				demo.setExecutionMessage("Data not edited");
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
