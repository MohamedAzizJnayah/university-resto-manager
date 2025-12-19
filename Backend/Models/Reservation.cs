using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiRestaurant.Models
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        public string Date { get; set; }
        public string Description { get; set; }

        [ForeignKey("Etudiant")]
        public int EtudiantId { get; set; }
        public Etudiant Etudiant { get; set; }

        [ForeignKey("Paiement")]
        public int PaiementId { get; set; }
        public Paiement Paiement { get; set; }

        [ForeignKey("Plat")]
        public int PlatId { get; set; }
        public Plat Plat { get; set; }
    }
}
