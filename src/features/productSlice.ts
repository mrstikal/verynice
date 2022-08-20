import { createSlice } from '@reduxjs/toolkit'
import allProducts from '../config/ProductConfig'
import _orderBy from 'lodash/orderBy'

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [] as any
    },
    reducers: {
      orderAndFilter: (state, action) => {

        state.products = allProducts

        const orderBy: any =  action.payload.order
        const filter: any = action.payload.filter
        
        let filtered: any

        const category = filter.value;

        if (category === 'Vše') {
            filtered = state.products
        } else {
            filtered = state.products.filter((product: any) => {
                return product.categories.includes(category)
            })
        }

        const orderby = orderBy.value[0]
        const orderDirection = orderBy.value[1]

        if (typeof filtered[0][orderby] === 'number') {
            filtered = _orderBy(filtered, (o: any) => +o[orderby], [orderDirection])
        } else {
            filtered = _orderBy(filtered, (o: any) => o[orderby], [orderDirection])
        }

        state.products = filtered
      },
    }
  })
  
  export const { orderAndFilter } = productSlice.actions
  
  export default productSlice.reducer