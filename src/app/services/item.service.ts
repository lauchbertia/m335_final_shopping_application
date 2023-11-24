import { Injectable } from "@angular/core";

import { LoadingController } from "@ionic/angular";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Item } from "src/app/data/item";
import { environment } from "src/environments/environment";
import { List } from "../data/list";

export const ITEMS_TABLE = 'items'
export const LISTS_TABLE = 'lists'

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  private supabase: SupabaseClient

  constructor (private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  createLoader() {
    return this.loadingCtrl.create()
  }

  async getList (id: number) {
    const { data, error } = await this.supabase
      .from(LISTS_TABLE)
      .select('*')
      .eq('id', id)
      .single()

    return data || {}
  }

  async getLists () {
    const { data, error } = await this.supabase
      .from(LISTS_TABLE)
      .select('*')
      .order('name')

    return data || []
  }

  async updateList (list: List) {
    const {data, error} = await this.supabase
      .from(LISTS_TABLE)
      .update(list)
      .eq('id', list.id)
      .select()

    return data
  }

  async createList(list: List) {

    const {data, error} = await this.supabase
      .from(LISTS_TABLE)
      .insert({
        name: list.name,
      })
      .select('*')
      .single();

    return data
  }

  async deleteList (list: List) {
    const {data, error} = await this.supabase
      .from(LISTS_TABLE)
      .delete()
      .eq('id', list.id)
      .select()

    return data
  }

  async getItem (id: number) {
    const { data, error } = await this.supabase
      .from(ITEMS_TABLE)
      .select('*')
      .eq('id', id)
      .single()

    return data || {}
  }

  async getItems () {
    const { data, error} = await this.supabase
      .from(ITEMS_TABLE)
      .select('*')
      .order('name')

    return data || []
  }

  async updateItem (item: Item) {
    const {data, error} = await this.supabase
      .from(ITEMS_TABLE)
      .update(item)
      .eq('id', item.id)
      .select()

    return data
  }

  async createItem(item: Item) {

    const {data, error} = await this.supabase
      .from(ITEMS_TABLE)
      .insert({
        name: item.name,
        list: item.list,
        url: item.url
      })
      .select('*')
      .single();

    return data
  }

  async deleteItem (item: Item) {
    const {data, error} = await this.supabase
      .from(ITEMS_TABLE)
      .delete()
      .eq('id', item.id)
      .select()

    return data
  }

}
