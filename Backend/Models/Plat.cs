using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiRestaurant.Models
{
    public class Plat
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Prix { get; set; }
        public string Image { get; set; }

        [ForeignKey("Menu")]
        public int MenuId { get; set; }
        public Menu Menu { get; set; }

        public ICollection<Reservation> Reservations { get; set; }
    }
}
