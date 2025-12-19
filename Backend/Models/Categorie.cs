using System.ComponentModel.DataAnnotations;

namespace ApiRestaurant.Models
{
    public class Categorie
    {
        [Key]
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
}
