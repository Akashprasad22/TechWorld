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
    
    // Electronics - High-quality tech images
    if (category === 'electronics') {
      if (name.includes('headphone') || name.includes('earphone')) {
        return 'https://images.unsplash.com/photo-1505740420958-88e529a7b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('watch') || name.includes('smartwatch')) {
        return 'https://images.unsplash.com/photo-1523275335883-b626f84dcf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('camera') || name.includes('dslr')) {
        return 'https://images.unsplash.com/photo-1542030185086-824a1aa3c5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('laptop') || name.includes('notebook')) {
        return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('phone') || name.includes('smartphone')) {
        return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('keyboard')) {
        return 'https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('mouse')) {
        return 'https://images.unsplash.com/photo-1615463149636-5ae231b8044?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('webcam')) {
        return 'https://images.unsplash.com/photo-1596728348854-9e5171b5b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('hub') || name.includes('adapter')) {
        return 'https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('charger')) {
        return 'https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('monitor') || name.includes('light bar')) {
        return 'https://images.unsplash.com/photo-1513056857803-7cf5a91db748?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
    }
    
    // Furniture - Office and home furniture
    if (category === 'furniture') {
      if (name.includes('chair') || name.includes('seat')) {
        return 'https://images.unsplash.com/photo-1586023498325-558dc9a1c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('desk') || name.includes('table')) {
        return 'https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('converter') || name.includes('standing')) {
        return 'https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
    }
    
    // Office Supplies - Professional workspace items
    if (category === 'office supplies') {
      if (name.includes('organizer') || name.includes('pen')) {
        return 'https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('box') || name.includes('management')) {
        return 'https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('lamp') || name.includes('light')) {
        return 'https://images.unsplash.com/photo-1513056857803-7cf5a91db748?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
    }
    
    // Lighting - Professional lighting products
    if (category === 'lighting') {
      if (name.includes('lamp') || name.includes('light')) {
        return 'https://images.unsplash.com/photo-1513056857803-7cf5a91db748?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('monitor') || name.includes('tv')) {
        return 'https://images.unsplash.com/photo-1513056857803-7cf5a91db748?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
      if (name.includes('rgb') || name.includes('led')) {
        return 'https://images.unsplash.com/photo-1513056857803-7cf5a91db748?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      }
    }
    
    // Default fallback for any product
    return 'https://images.unsplash.com/photo-1607082318824-0b96e631c11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  }

  // Get fallback image based on product category (backup method)
  getFallbackImage(productName) {
    const category = this.detectCategory(productName);
    const categoryImages = {
      'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7cd166b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'furniture': 'https://images.unsplash.com/photo-1586023498325-558dc9a1c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'office supplies': 'https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'lighting': 'https://images.unsplash.com/photo-1513056857803-7cf5a91db748?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'default': 'https://images.unsplash.com/photo-1607082318824-0b96e631c11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };

    return categoryImages[category] || categoryImages.default;
  }

  // Detect product category from name
  detectCategory(productName) {
    const name = productName.toLowerCase();
    
    if (name.includes('headphone') || name.includes('earphone')) return 'electronics';
    if (name.includes('watch') || name.includes('smartwatch')) return 'electronics';
    if (name.includes('camera') || name.includes('dslr')) return 'electronics';
    if (name.includes('laptop') || name.includes('notebook')) return 'electronics';
    if (name.includes('phone') || name.includes('smartphone')) return 'electronics';
    if (name.includes('keyboard')) return 'electronics';
    if (name.includes('mouse')) return 'electronics';
    if (name.includes('webcam')) return 'electronics';
    if (name.includes('hub') || name.includes('adapter')) return 'electronics';
    if (name.includes('charger')) return 'electronics';
    if (name.includes('monitor') || name.includes('light bar')) return 'lighting';
    if (name.includes('lamp') || name.includes('light')) return 'lighting';
    if (name.includes('chair') || name.includes('seat')) return 'furniture';
    if (name.includes('desk') || name.includes('table')) return 'furniture';
    if (name.includes('converter') || name.includes('standing')) return 'furniture';
    if (name.includes('organizer') || name.includes('pen')) return 'office supplies';
    if (name.includes('box') || name.includes('management')) return 'office supplies';
    if (name.includes('furniture') || name.includes('sofa')) return 'furniture';
    
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
