using Microsoft.EntityFrameworkCore;

namespace serverEcommerce.Models
{
    public class ProductsContext : DbContext
    {
        public ProductsContext()
        { }
        public ProductsContext(DbContextOptions<ProductsContext> options) : base(options)
        { }
        public DbSet<Products> Products { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { optionsBuilder.UseMySql("Server=localhost;Port=3306;Database=db_schema;User=root;Password=walterishe;"); }
    }
}