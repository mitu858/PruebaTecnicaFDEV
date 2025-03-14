using AutoMapper;
using BackendAPI.Models;
using BackendAPI.DTOs;

namespace BackendAPI.Mappings
{
    public class PersonaProfile : Profile
    {
        public PersonaProfile()
        {
            CreateMap<Persona, PersonaDTO>().ReverseMap();
        }
    }
}
