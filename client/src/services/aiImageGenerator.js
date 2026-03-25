// AI Image Generation Service
// Generates relevant product images based on product name and category

class AIImageGenerator {
  constructor() {
    this.apiKey = null; // You can add your API key here
  }

  // Generate image using product name, description, and category
  async generateProductImage(productName, productDescription, productCategory) {
    try {
      // Get relevant image based on product name and category
      const relevantImage = this.getRelevantProductImage(productName, productCategory);
      return relevantImage;
    } catch (error) {
      console.error('Image generation failed:', error);
      return this.getFallbackImage(productName);
    }
  }

  // Get relevant high-quality image based on product name and category
  getRelevantProductImage(productName, productCategory) {
    const name = productName.toLowerCase();
    const category = productCategory.toLowerCase();
    
    // Phones Category - High-quality phone images
    if (category === 'phones') {
      if (name.includes('iphone')) {
        return 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('samsung') || name.includes('galaxy')) {
        return 'https://images.unsplash.com/photo-1580910051074-3eb69488a505?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('oneplus')) {
        return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('pixel') || name.includes('google')) {
        return 'https://images.unsplash.com/photo-1592286115803-a1c3b552ee43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
    
    // Electronics Category - Tech and home appliances
    if (category === 'electronics') {
      if (name.includes('tv') || name.includes('television') || name.includes('qled')) {
        return 'https://images.unsplash.com/photo-1593784997442-6469b5a3939e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('ac') || name.includes('air conditioner')) {
        return 'https://images.unsplash.com/photo-1580052305799-29f8fe135c3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('refrigerator') || name.includes('fridge')) {
        return 'https://images.unsplash.com/photo-1584464491033-06608f0fee4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('headphone') || name.includes('earphone') || name.includes('sony')) {
        return 'https://images.unsplash.com/photo-1505740420958-88e529a7b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('laptop') || name.includes('macbook') || name.includes('dell')) {
        return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('ipad') || name.includes('tablet')) {
        return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      return 'https://images.unsplash.com/photo-1498049794561-7780e7cd166b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
    
    // Fashion Category - Clothing and accessories
    if (category === 'fashion') {
      if (name.includes('shoes') || name.includes('nike') || name.includes('adidas')) {
        return 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('jeans') || name.includes('levi')) {
        return 'https://images.unsplash.com/photo-1541099649105-f69ef21e335e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('shirt') || name.includes('polo') || name.includes('ralph lauren')) {
        return 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('dress') || name.includes('zara')) {
        return 'https://images.unsplash.com/photo-1594634319152-14e987837c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('handbag') || name.includes('coach')) {
        return 'https://images.unsplash.com/photo-1584917865444-70f1e68e4aa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('leggings')) {
        return 'https://images.unsplash.com/photo-1584512673728-48e0e90b9d4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('sunglasses') || name.includes('ray-ban')) {
        return 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('watch')) {
        return 'https://images.unsplash.com/photo-1523275335883-b626f84dcf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
    
    // Default fallback for any product
    return 'https://images.unsplash.com/photo-1607082318824-0b96e631c11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  }

  // Get fallback image based on product category (backup method)
  getFallbackImage(productName) {
    const category = this.detectCategory(productName);
    const categoryImages = {
      'phones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7cd166b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'fashion': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'default': 'https://images.unsplash.com/photo-1607082318824-0b96e631c11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };

    return categoryImages[category] || categoryImages.default;
  }

  // Detect product category from name
  detectCategory(productName) {
    const name = productName.toLowerCase();
    
    // Phones category detection
    if (name.includes('iphone') || name.includes('samsung') || name.includes('galaxy') || 
        name.includes('oneplus') || name.includes('pixel') || name.includes('phone') || 
        name.includes('smartphone')) return 'phones';
    
    // Electronics category detection
    if (name.includes('tv') || name.includes('television') || name.includes('ac') || 
        name.includes('air conditioner') || name.includes('refrigerator') || name.includes('fridge') ||
        name.includes('headphone') || name.includes('earphone') || name.includes('sony') ||
        name.includes('laptop') || name.includes('macbook') || name.includes('dell') ||
        name.includes('ipad') || name.includes('tablet')) return 'electronics';
    
    // Fashion category detection
    if (name.includes('shoes') || name.includes('nike') || name.includes('adidas') ||
        name.includes('jeans') || name.includes('levi') || name.includes('shirt') ||
        name.includes('polo') || name.includes('ralph lauren') || name.includes('dress') ||
        name.includes('zara') || name.includes('handbag') || name.includes('coach') ||
        name.includes('leggings') || name.includes('sunglasses') || name.includes('ray-ban') ||
        name.includes('watch') || name.includes('fashion')) return 'fashion';
    
    return 'electronics'; // Default category
  }

  // Set API key for real AI services
  setApiKey(key) {
    this.apiKey = key;
  }

  // Generate image using OpenAI DALL-E (requires API key)
  async generateWithDALL_E(prompt) {
    if (!this.apiKey) {
      throw new Error('API key required for DALL-E generation');
    }

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: '512x512',
        response_format: 'url'
      })
    });

    const data = await response.json();
    return data.data[0].url;
  }

  // Generate image using Stability AI (requires API key)
  async generateWithStabilityAI(prompt) {
    if (!this.apiKey) {
      throw new Error('API key required for Stability AI generation');
    }

    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 512,
        width: 512,
        samples: 1,
        steps: 30
      })
    });

    const data = await response.json();
    return `data:image/png;base64,${data.artifacts[0].base64}`;
  }
}

// Export singleton instance
export const aiImageGenerator = new AIImageGenerator();

// Helper function for React components
export const generateProductImage = async (productName, productDescription, productCategory) => {
  try {
    return await aiImageGenerator.generateProductImage(productName, productDescription, productCategory);
  } catch (error) {
    console.error('Failed to generate product image:', error);
    return aiImageGenerator.getFallbackImage(productName);
  }
};
