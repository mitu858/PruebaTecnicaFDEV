using BackendAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackendAPI.Repositories
{
    public interface IPersonaRepository
    {
        Task<IEnumerable<Persona>> GetAll();
        Task<Persona> GetById(int id);
        Task Add(Persona persona);
        Task Update(Persona persona);
        Task Delete(int id);
    }
}
