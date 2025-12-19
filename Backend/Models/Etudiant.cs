using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ApiRestaurant.Models
{
    public class Etudiant
    {
        [Key]
        public int CIN { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Mail { get; set; }
        public string Motpasse { get; set; }

        public ICollection<Reservation> Reservations { get; set; }
    }
}
