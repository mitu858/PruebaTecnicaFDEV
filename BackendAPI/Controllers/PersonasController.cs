using AutoMapper;
using BackendAPI.DTOs;
using BackendAPI.Models;
using BackendAPI.Services;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly PersonaService _service;
        private readonly IMapper _mapper;
        private readonly IValidator<PersonaDTO> _validator;

        public PersonasController(PersonaService service, IMapper mapper, IValidator<PersonaDTO> validator)
        {
            _service = service;
            _mapper = mapper;
            _validator = validator;
        }

        [HttpGet]
        public async Task<IEnumerable<PersonaDTO>> GetAll()
        {
            var personas = await _service.GetAll();
            return _mapper.Map<IEnumerable<PersonaDTO>>(personas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PersonaDTO>> GetById(int id)
        {
            var persona = await _service.GetById(id);
            if (persona == null) return NotFound();
            return _mapper.Map<PersonaDTO>(persona);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] PersonaDTO personaDto)
        {
            var validationResult = await _validator.ValidateAsync(personaDto);
            if (validationResult.IsValid)
            {
                var persona = _mapper.Map<Persona>(personaDto);
                var personaGuardada = await _service.Add(persona); // Obtenemos la entidad con ID generado
                var personaRespuesta = _mapper.Map<PersonaDTO>(personaGuardada);
                return CreatedAtAction(nameof(GetById), new { id = personaRespuesta.Id }, personaRespuesta);
            }
            else
            {
                return BadRequest(validationResult.Errors);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PersonaDTO personaDto)
        {
            if (id != personaDto.Id) return BadRequest();

            var persona = _mapper.Map<Persona>(personaDto);
            var personaActualizada = await _service.Update(persona);

            if (personaActualizada == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PersonaDTO>(personaActualizada));
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
