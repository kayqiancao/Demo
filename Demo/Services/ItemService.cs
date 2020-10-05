using Demo.Dao;
using Demo.Models;
using System.Collections.Generic;

namespace Demo.Services
{

    public interface IItemService 
    {
        List<Item> GetAll();

        void Save(Item item);

        void Delete(Item item);
    }
    public class ItemService : IItemService
    {
        internal IItemRepository itemRepository;

        public ItemService(IItemRepository itemRepository)
        {
            this.itemRepository = itemRepository;
        }

        public void Delete(Item item)
        {
            if (item.Id.HasValue)
            {
                itemRepository.Delete(item.Id.Value);
            }
        }

        public List<Item> GetAll()
        {
           return itemRepository.GetAll();
        }

        public void Save(Item item)
        {
            itemRepository.Add(item);
        }
    }
}
