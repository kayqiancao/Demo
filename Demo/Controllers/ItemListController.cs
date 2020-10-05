using System.Collections.Generic;
using Demo.Models;
using Demo.Services;
using Microsoft.AspNetCore.Mvc;

namespace Demo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemListController : ControllerBase
    {
  
        private readonly IItemService _itemService;

        public ItemListController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public IEnumerable<Item> Get()
        {
            return _itemService.GetAll();
        }

        [HttpPost]
        public IEnumerable<Item> Post(Item item)
        {
            _itemService.Save(item);
            return _itemService.GetAll();
        }

        [HttpDelete]
        public IEnumerable<Item> Delete(Item item)
        {
            _itemService.Delete(item);
            return _itemService.GetAll();
        }
    }
}
