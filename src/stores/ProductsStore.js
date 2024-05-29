import { action, makeObservable, observable, reaction, runInAction } from "mobx";
import { fetchPizzas } from "../screens/Home/services/actions";

export default class ProductsStore {
  @observable products = [];
  @observable page = 1;
  @observable search = '';
  @observable filters = [];
  @observable refreshing = false;
  @observable isLoading = false;
  @observable searchVisible = false;
  @observable newOnlyChecked = false;
  @observable reachedEnd = false;
  @observable loadingMore = false;
  hasFilters = !!this.filters?.length;
  loadingCheck = false;

  constructor() {
    makeObservable(this);
    reaction(() => [this.search, this.filters], () => {
      this.loadProducts(true);
    });
  }

  loadProducts = async (refresh) => {
    if (this.loadingCheck && (!refresh && this.reachedEnd)) return;

    if (refresh) {
      this.setPage(1);
      this.setRefreshing(true);
    }

    this.loadingCheck = true;

    this.setIsLoading(true);
    
    const { data, metaCount } = await fetchPizzas(this.page, this.search, this.filters);

    this.setPage(this.page + 1);
    this.setRefreshing(false);
    this.setIsLoading(false);

    runInAction(() => {
      this.reachedEnd = this.products.length === metaCount;
      this.loadingCheck = false;
      this.products = refresh ? data : [...this.products, ...data.filter(x => !this.products.map(s => s.id).includes(x.id))];
    });
  }

  onRefresh = () => {
    this.setSearch('');
    this.handleFilter(false, 'isNew');
    this.loadProducts(true);
  }

  loadMore = async () => {
    if (this.isLoading || this.loadingMore) return;
    this.setLoadingMore(true);
    await this.loadProducts();
    this.setLoadingMore(false);
  }

  @action setLoadingMore = (value) => {
    this.loadingMore = value;
  }

  @action handleFilter = (isAdd, filter, value) => {
    this.setFilters(isAdd ? [...this.filters, [filter, value]] : this.filters.filter(item => item[0] !== filter));
  }

  @action changePage = () => {
    if (this.reachedEnd || this.search || this.hasFilters) return;

    this.setPage(this.page + 1);
  }

  @action setPage(page) {
    this.page = page;
  }

  @action setSearch = (search) => {
    this.search = search;
  }

  @action setFilters = (filters) => {
    this.filters = filters;
  }

  @action setRefreshing(refreshing) {
    this.refreshing = refreshing;
  }

  @action setIsLoading(value) {
    this.isLoading = value;
  }

  @action toggleSearchVisible = () => {
    this.searchVisible = !this.searchVisible;
  }

  @action setNewOnlyChecked = (value) => {
    this.newOnlyChecked = value;
  }
}