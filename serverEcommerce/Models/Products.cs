using System;
using Microsoft.EntityFrameworkCore;

namespace serverEcommerce.Models 
{
    public class Products
    {
          public int id { get; set; }
          public string productName { get; set; }
          public string category { get; set; }
          public string description_type {get;set;}
          public string image { get; set; }
          public int stockQuantity { get; set; }
          public bool available {get; set;}
       
    }
}