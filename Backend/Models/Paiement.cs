using System.ComponentModel.DataAnnotations;

namespace ApiRestaurant.Models
{
    public class Paiement
    {
        [Key]
        public int Id { get; set; }
        public float Montant { get; set; }
        public string Methode { get; set; }
    }
}
