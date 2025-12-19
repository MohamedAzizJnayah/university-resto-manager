using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiRestaurant.Data;
using ApiRestaurant.Models;

namespace ApiRestaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaiementController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PaiementController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Paiement
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paiement>>> GetPaiements()
        {
            return await _context.Paiements.ToListAsync();
        }

        // GET: api/Paiement/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Paiement>> GetPaiement(int id)
        {
            var paiement = await _context.Paiements.FindAsync(id);

            if (paiement == null)
            {
                return NotFound();
            }

            return paiement;
        }

        // PUT: api/Paiement/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaiement(int id, Paiement paiement)
        {
            if (id != paiement.Id)
            {
                return BadRequest();
            }

            _context.Entry(paiement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaiementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Paiement
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Paiement>> PostPaiement(Paiement paiement)
        {
            _context.Paiements.Add(paiement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaiement", new { id = paiement.Id }, paiement);
        }

        // DELETE: api/Paiement/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaiement(int id)
        {
            var paiement = await _context.Paiements.FindAsync(id);
            if (paiement == null)
            {
                return NotFound();
            }

            _context.Paiements.Remove(paiement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaiementExists(int id)
        {
            return _context.Paiements.Any(e => e.Id == id);
        }
    }
}
