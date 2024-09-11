using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using CloudinaryDotNet.Actions;
using ECommerceBE.Data;
using ECommerceBE.Models;
using ECommerceBE.Services;

namespace ECommerceBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ICloudinaryService _cloudinaryService;

        public ProductController(AppDbContext context, ICloudinaryService cloudinaryService)
        {
            _context = context;
            _cloudinaryService = cloudinaryService;
        }

        // GET: all products
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(_context.Products.ToList());
        }

        // GET: product by id
        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // POST: product
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Product>> AddProduct([FromForm] Product product, IFormFile[] images)
        {
            var imageUrls = new List<string>();

            foreach (var image in images)
            {
                var uploadedUrl = await _cloudinaryService.UploadImageAsync(image);
                if (uploadedUrl != null)
                {
                    imageUrls.Add(uploadedUrl);
                }
            }

            product.ImageUrls = imageUrls.ToArray();

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, product);
        }

        // PUT: product by id
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public ActionResult UpdateProduct(int id, Product updatedProduct)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.Description = updatedProduct.Description;
            product.ImageUrls = updatedProduct.ImageUrls;
            product.StockQuantity = updatedProduct.StockQuantity;
            product.Category = updatedProduct.Category;

            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: product by id
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public ActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
