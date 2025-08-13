/**
 * @interface NutritionalInfo
 * @description Represents the nutritional information for a receipt.
 * @property {string} id - Unique identifier for the nutritional information (UUID).
 * @property {number | null} calories_kcal - Calories in kilocalories.
 * @property {number | null} protein_g - Protein content in grams.
 * @property {number | null} carbohydrates_g - Carbohydrates content in grams.
 * @property {number | null} fats_g - Fats content in grams.
 * @property {number | null} fiber_g - Fiber content in grams.
 * @property {number | null} sugars_g - Sugars content in grams.
 * @property {number | null} sodium_mg - Sodium content in milligrams.
 */
export interface NutritionalInfo {
  id: string;
  calories_kcal: number | null;
  protein_g: number | null;
  carbohydrates_g: number | null;
  fats_g: number | null;
  fiber_g: number | null;
  sugars_g: number | null;
  sodium_mg: number | null;
}

/**
 * @interface TagItem
 * @description Represents a single tag item with text and icon information.
 * @property {string} text - The display text for the tag.
 * @property {string} iconColorClass - Tailwind CSS class for the icon color.
 * @property {string} iconIdentifier - Identifier for the icon.
 */
export interface TagItem {
  text: string;
  iconColorClass: string;
  iconIdentifier: string;
}

/**
 * @interface Receipt
 * @description Represents a food receipt or recipe.
 * @property {string} id - Unique identifier for the receipt (UUID).
 * @property {string | null} nutritional_info_id - Foreign key to nutritional information, can be null.
 * @property {string} language - Language of the receipt (e.g., 'en', 'es').
 * @property {string} slug - URL-friendly slug for the receipt.
 * @property {string} title - Title of the receipt.
 * @property {string | null} perfect_for - Description of who the receipt is perfect for.
 * @property {string | null} image_url - URL of the receipt's image.
 * @property {string | null} image_alt_text - Alt text for the receipt's image.
 * @property {string | null} prep_time - Preparation time for the receipt.
 * @property {string | null} calories - Calorie information as a string.
 * @property {string[]} ingredients - JSONB array of ingredients (array of strings).
 * @property {string[]} benefits - JSONB array of benefits (array of strings).
 * @property {string | null} how_to_prepare - Instructions on how to prepare the receipt.
 * @property {string | null} quote - A quote related to the receipt.
 * @property {TagItem[] | null} tags - JSONB array of tags associated with the receipt (array of TagItem objects).
 * @property {string | null} category - Category of the receipt.
 * @property {string | null} seo_title - SEO title for the receipt.
 * @property {string | null} seo_description - SEO description for the receipt.
 * @property {string | null} seo_keywords - SEO keywords for the receipt.
 * @property {string | null} created_at - Timestamp when the receipt was created.
 * @property {string | null} updated_at - Timestamp when the receipt was last updated.
 * @property {NutritionalInfo | null} nutritional_info - Nested nutritional information object, can be null.
 */
export interface Receipt {
  id: string;
  nutritional_info_id: string | null;
  language: string;
  slug: string;
  title: string;
  perfect_for: string | null;
  image_url: string | null;
  image_alt_text: string | null;
  prep_time: string | null;
  calories: string | null;
  ingredients: string[];
  benefits: string[];
  how_to_prepare: string | null;
  quote: string | null;
  tags: TagItem[] | null;
  category: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  created_at: string | null;
  updated_at: string | null;
  nutritional_info: NutritionalInfo | null;
}
