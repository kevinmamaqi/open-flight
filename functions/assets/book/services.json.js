import { json, serviceConfig } from '../../_flight-book.js'

export function onRequestGet({ request, env }) {
  return json(serviceConfig(request, env))
}
