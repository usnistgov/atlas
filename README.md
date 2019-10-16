<p align="center">
<img src="frontend/pictures/OrangeEarthLogo.png"></img>
</p>

Web Application built with MongoDB, Django, Redux, ReactJS, and D3 that allows public 
safety proefssionals to enter information related to scenarios that they encounter 
on the job to help organize and link related incidents and organizations based on common
information.

The application includes a number of components to help with storing and searching
for information including: 

* **Database:**  MongoDB database stores information about scenarios as "Use Cases" which are comprised of a number of subcomponents. Each subcomponent has its own collection and the entries in each "Use Case" are lists of ids of the entries in the subcomponent's collection. 
* **REST API:** The REST API enables searching for database entries using keywords organized through HTTP queries. Written using a combination of Django boilerplate code and custom Views for translating REST queries to MongoDB database queries. 
* **Frontend Application** The frontend application consists of three pages that help to visualize the information contained in the database and allow the user to insert, update, and remove any component. The pages included in the application are: 
  * **Use Case Catalog** Lists all the use cases along with tables containing their subcomponent entries. When you click on a Use Case a more detailed page is rendered that allows you to update or delete information for that Use Case. There is also a separate tab that when clicked will create a D3 force directed graph of the subcomponents of that Use Case, which automatically updates as information is added or removed from that Use Case. 
  * **Information Type Catalog** Use Cases contain subcategories of information labeled 'Information Types', which are higher level descirptions of types of information that pertain to a particular Use Case that can be common among different Use Cases. These Information Types include: 
    * Title
    * Description of what the Information Type Represents, 
    * Rating for its overall Confidentiality/Integrity/Availability as it applies to information security
    * Information Categories (subcomponent which represents more specific items than information types)
    * Security Reasoning for Information Type
  * **Glossary** Collection of Subcomponents that make up Use Cases and Information Types. The Glossary holds the name and description of each subcomponent, as well as potentially links to more detailed descriptions of what the entry in the Glossary represents.  
    

