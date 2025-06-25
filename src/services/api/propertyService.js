import propertiesData from '../mockData/properties.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PropertyService {
  constructor() {
    this.properties = [...propertiesData];
  }

  async getAll() {
    await delay(300);
    return [...this.properties];
  }

  async getById(id) {
    await delay(200);
    const property = this.properties.find(p => p.Id === parseInt(id, 10));
    if (!property) {
      throw new Error('Property not found');
    }
    return { ...property };
  }

  async search(filters = {}) {
    await delay(400);
    let filtered = [...this.properties];

    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(searchTerm) ||
        p.address.toLowerCase().includes(searchTerm) ||
        p.zip.includes(searchTerm)
      );
    }

    if (filters.priceMin !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.priceMin);
    }

    if (filters.priceMax !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.priceMax);
    }

    if (filters.bedroomsMin !== undefined) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedroomsMin);
    }

    if (filters.bathroomsMin !== undefined) {
      filtered = filtered.filter(p => p.bathrooms >= filters.bathroomsMin);
    }

    if (filters.sqftMin !== undefined) {
      filtered = filtered.filter(p => p.sqft >= filters.sqftMin);
    }

    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      filtered = filtered.filter(p => filters.propertyTypes.includes(p.type));
    }

    return filtered;
  }

  async create(property) {
    await delay(500);
    const maxId = Math.max(...this.properties.map(p => p.Id), 0);
    const newProperty = {
      ...property,
      Id: maxId + 1,
      listingDate: new Date().toISOString()
    };
    this.properties.push(newProperty);
    return { ...newProperty };
  }

  async update(id, data) {
    await delay(400);
    const index = this.properties.findIndex(p => p.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Property not found');
    }
    
    this.properties[index] = {
      ...this.properties[index],
      ...data,
      Id: this.properties[index].Id // Prevent ID modification
    };
    return { ...this.properties[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.properties.findIndex(p => p.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Property not found');
    }
    
    const deletedProperty = this.properties.splice(index, 1)[0];
    return { ...deletedProperty };
  }
}

export default new PropertyService();