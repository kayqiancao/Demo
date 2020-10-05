using Demo.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Dao
{
    public interface IRepository<T> where T : class
    {
        List<T> GetAll();
     
        T Add(T entity);
     
        T Delete(int id);
    }

    public abstract class AbstractRepository<TEntity, TContext> : IRepository<TEntity>
        where TEntity : class
        where TContext : DbContext
    {
        private readonly TContext context;
        public AbstractRepository(TContext context)
        {
            this.context = context;
        }
        public TEntity Add(TEntity entity)
        {
            context.Set<TEntity>().Add(entity);
            context.SaveChanges();

            return entity;
        }

        public TEntity Delete(int id)
        {
            var entity = context.Set<TEntity>().Find(id);
            if (entity == null)
            {
                return entity;
            }

            context.Set<TEntity>().Remove(entity);
            context.SaveChanges();

            return entity;
        }

        public List<TEntity> GetAll()
        {
            return context.Set<TEntity>().ToList();
        }
    }
}
