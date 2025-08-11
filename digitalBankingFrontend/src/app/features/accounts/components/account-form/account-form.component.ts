import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6">Create New Account</h1>

      <div class="bg-white p-6 rounded-lg shadow">
        <form>
          <!-- Account Type -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">Select Account Type</option>
              <option value="CURRENT">Current Account</option>
              <option value="SAVING">Saving Account</option>
            </select>
          </div>

          <!-- Initial Balance -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Initial Balance
            </label>
            <input
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <!-- Buttons -->
          <div class="flex gap-4">
            <button
              type="button"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class AccountFormComponent {}
