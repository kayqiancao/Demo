import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as ItemListStore from '../store/ItemList';

type ItemListProps =
    ItemListStore.ItemListState
    & typeof ItemListStore.actionCreators

type ItemListState =
    ItemListStore.Item


class Home extends React.PureComponent<ItemListProps, ItemListState> {
    constructor(props: any) {
        super(props);
        this.state = { name: '', price: 0, category: 'Electronics' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            category: event.target.value
        });
    }

    handleSubmit(event: any) {
        alert('A name was submitted:');
        event.preventDefault();
    }

    public componentDidMount() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Item List</h1>
                {this.renderItemListTable()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestItemList();
    }

    private renderItemListTable() {
        const getTotal = (categories: ItemListStore.Category[] | null) => {
            if (!categories) {
                return 0;
            }
            let total = 0;
            categories.map(category => total = total + getCatogoryTotal(category.items));
            return total;
        }
        const getCatogoryTotal = (items: ItemListStore.Item[]) => {
            let total = 0;
            items.map(item => total = total + (item === undefined ? 0 : (item.price === undefined ? 0 : item.price)));
            return total;
        }
        const getCategories = (data: ItemListStore.Item[] | undefined) => {
            if (data === undefined) {
                return null;
            }
            let categories = [];
            let electronics = data.filter(o => o.category === 'Electronics');
            let clothing = data.filter(o => o.category === 'Clothing');
            if (electronics.length > 0) {
                categories.push({ categoryName: 'Electronics', items: electronics });
            }
            if (clothing.length > 0) {
                categories.push({ categoryName: 'Clothing', items: clothing });
            }
            return categories;
        }
        const categories = getCategories(this.props.allItems);

        return (
            <div>
                {categories && categories.map(category =>
                    <div className='category' key={category.categoryName}>
                        <div>{category.categoryName} ${getCatogoryTotal(category.items)}</div>
                        {category.items.map(item =>
                            <div className='item' key={item.id}>
                                <div>{item.name}:</div>
                                <div className='value'>${item.price}</div>
                                <button type="button"
                                    className="btn btn-secondary value"
                                    onClick={() => this.props.deleteItem(item)}>
                                    Delete
                                </button>
                            </div>)}
                    </div>
                )}
                <div>Total: ${getTotal(categories)}</div>
                <div className='inputForm'>
                    <label>Item name:</label>
                    <input type="text" name='name' value={this.state.name} onChange={this.handleChange} className='value' />
                    <label className='value'>Value:</label>
                    <input type="text" name='price' value={this.state.price} onChange={this.handleChange} className='value' />
                    <label className='value'>Category:</label>
                    <select value={this.state.category} onChange={this.handleSelectChange} className='value'>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                    </select>
                    <button type="button"
                        className="btn btn-primary value"
                        onClick={() => this.props.postItem(this.state)}>
                        Add
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.itemLists,
    ItemListStore.actionCreators
)(Home as any);