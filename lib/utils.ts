import { Message } from "ai"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function filterMessages(messages: Message[]): Message[] {
  return messages.filter(
    message => message.role !== 'system' && message.role !== 'function'
  )
}