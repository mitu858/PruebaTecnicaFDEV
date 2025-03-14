using BackendAPI.Models;
using BackendAPI.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackendAPI.Services
{
    public class PersonaService
    {
        private readonly IPersonaRepository _repository;

        public PersonaService(IPersonaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Persona>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<Persona> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<Persona> Add(Persona persona)
        {
            await _repository.Add(persona);
            return persona;
        }
        public async Task<Persona> Update(Persona persona)
        {
            var personaExistente = await _repository.GetById(persona.Id);
            if (personaExistente == null) return null; 

            // Actualizar los datos
            personaExistente.Nombre = persona.Nombre;
            personaExistente.Apellido = persona.Apellido;
            personaExistente.Email = persona.Email;

            await _repository.Update(personaExistente); 

            return personaExistente; 
        }


        public async Task Delete(int id)
        {
            await _repository.Delete(id);
        }
    }
}
