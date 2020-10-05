using Demo.Data;
using Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Dao
{
    public interface IItemRepository 
    {
        List<Item> GetAll();

        Item Add(Item entity);

        Item Delete(int id);
    }

    public class ItemRepository : AbstractRepository<Item, DemoContext>, IItemRepository
    {
        public ItemRepository(DemoContext context) : base(context)
        {
        }
    }
}
