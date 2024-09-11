namespace ECommerceBE.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string[] ImageUrls { get; set; } = [];
        public int StockQuantity { get; set; }
        public string? Category { get; set; }
    }
}
