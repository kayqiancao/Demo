using Demo.Models;
using Demo.Services;
using Moq;
using Xunit;
using System.Collections.Generic;
using Demo.Controllers;

namespace DemoTest
{
    public class ItemListControllerTest
    {
        [Fact]
        public void Get_ReturnListOfItems()
        {
            var item = new Item();

            var mockService = new Mock<IItemService>();
            mockService.Setup(service => service.GetAll()).Returns(new List<Item> { item });
            var controller = new ItemListController(mockService.Object);

            var actual = controller.Get();

            Assert.Single(actual, item);
        }

        [Fact]
        public void Post_SaveItem_ReturnsListOfItems()
        {
            var item = new Item();

            var mockService = new Mock<IItemService>();
          
            mockService.Setup(service => service.GetAll()).Returns(new List<Item> { item });
            var controller = new ItemListController(mockService.Object);

            var actual = controller.Post(item);

            mockService.Verify(service => service.Save(item), Times.Once());
            Assert.Single(actual, item);
        }

        [Fact]
        public void Delete_RemoveItem_ReturnsEmptyList()
        {
            var item = new Item();

            var mockService = new Mock<IItemService>();

            mockService.Setup(service => service.GetAll()).Returns(new List<Item>());
            var controller = new ItemListController(mockService.Object);

            var actual = controller.Delete(item);

            mockService.Verify(service => service.Delete(item), Times.Once());
            Assert.Empty(actual);
        }
    }
}
