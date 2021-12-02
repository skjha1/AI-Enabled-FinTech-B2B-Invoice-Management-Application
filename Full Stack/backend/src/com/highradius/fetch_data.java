package com.highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
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


@WebServlet("/fetch_data")
public class fetch_data extends HttpServlet {
private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
	private static final String user = "root";
	private static final String password = "1234";
	static final String jdbc="com.mysql.cj.jdbc.Driver";
	static final String dburl = "jdbc:mysql://localhost:3306/highradius"; 
	
    public fetch_data() {
        super();
        // TODO Auto-generated constructor stub

    }
    private String json_from_res(List<invoice_json> resp)
    {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String json = gson.toJson(resp);
        return json;
        
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
        Connection connection  = null;
		Statement state = null;
		List<invoice_json> response_list = new ArrayList<invoice_json>();
		
		try
		{
			Class.forName(jdbc);
			connection = DriverManager.getConnection(dburl,user,password);
			
			state = connection.createStatement();
			String query_fetch = "select * from invoice_details LIMIT 20";
			
			ResultSet result = state.executeQuery(query_fetch);
			
			while(result.next())
			{
				invoice_json response_1 = new invoice_json();
				
				// set value for every row
		
				response_1.setName_customer(result.getString("name_customer"));
				response_1.setCust_number(result.getString("cust_number"));
				response_1.setInvoice_id(result.getString("invoice_id"));
				response_1.setTotal_open_amount(result.getString("total_open_amount"));
				response_1.setDue_in_date(result.getString("due_in_date"));
				response_1.setPredicted_date(result.getString("predicted_date"));
				response_1.setNotes(result.getString("notes"));
				// add this object to array list
				response_list.add(response_1);
			}
			String json_string = json_from_res(response_list);
			response.setContentType("application/json");
			try 
			{
				response.getWriter().write(json_string);
				
			}
			catch(IOException e)
			{
				e.printStackTrace();
			}
			
			result.close();
			state.close();
			connection.close();
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
