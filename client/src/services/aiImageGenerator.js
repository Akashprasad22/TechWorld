// AI Image Generation Service
// Generates product images using product name and description

class AIImageGenerator {
  constructor() {
    this.apiKey = null; // You can add your API key here
    this.fallbackPrompt = 'professional product photography, clean white background, high quality, e-commerce';
  }

  // Generate image using product name and description
  async generateProductImage(productName, productDescription) {
    try {
      // Create a descriptive prompt for AI image generation
      const prompt = this.createImagePrompt(productName, productDescription);
      
      // For now, we'll use a placeholder service that generates consistent images
      // In a real implementation, you would use services like:
      // - OpenAI DALL-E API
      // - Stability AI API
      // - Midjourney API
      // - Replicate API
      
      const imageUrl = await this.generateFromPrompt(prompt);
      return imageUrl;
    } catch (error) {
      console.error('AI image generation failed:', error);
      return this.getFallbackImage(productName);
    }
  }

  // Create a descriptive prompt for image generation
  createImagePrompt(productName, productDescription) {
    const basePrompt = `${productName}, ${productDescription}`;
    const stylePrompt = 'professional product photography, clean white background, studio lighting, high resolution, e-commerce style';
    const qualityPrompt = 'ultra realistic, detailed, commercial photography';
    
    return `${basePrompt}, ${stylePrompt}, ${qualityPrompt}`;
  }

  // Generate image from prompt (using placeholder service for demo)
  async generateFromPrompt(prompt) {
    // For demonstration, we'll use a service that generates consistent images
    // In production, replace this with actual AI API calls
    
    // Using a hash of the prompt to get consistent images
    const promptHash = this.hashCode(prompt);
    const seed = Math.abs(promptHash) % 1000;
    
    // Using a placeholder image service with seed for consistency
    return `https://picsum.photos/seed/${seed}/400/300.jpg`;
  }

  // Simple hash function for consistent image generation
  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }

  // Get fallback image based on product category
  getFallbackImage(productName) {
    const category = this.detectCategory(productName);
    const categoryImages = {
      'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7cd166b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'headphones': 'https://images.unsplash.com/photo-1505740420958-88e529a7b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'watch': 'https://images.unsplash.com/photo-1523275335883-b626f84dcf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'camera': 'https://images.unsplash.com/photo-1542030185086-824a1aa3c5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'furniture': 'https://images.unsplash.com/photo-1586023498325-558dc9a1c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'desk': 'https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'chair': 'https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'phone': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'keyboard': 'https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'mouse': 'https://images.unsplash.com/photo-1615463149636-5ae231b8044?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'lighting': 'https://images.unsplash.com/photo-1513056857803-7cf5a91db748?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'default': 'https://images.unsplash.com/photo-1607082318824-0b96e631c11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };

    return categoryImages[category] || categoryImages.default;
  }

  // Detect product category from name
  detectCategory(productName) {
    const name = productName.toLowerCase();
    
    if (name.includes('headphone') || name.includes('earphone')) return 'headphones';
    if (name.includes('watch') || name.includes('smartwatch')) return 'watch';
    if (name.includes('camera') || name.includes('dslr')) return 'camera';
    if (name.includes('laptop') || name.includes('notebook')) return 'laptop';
    if (name.includes('phone') || name.includes('smartphone')) return 'phone';
    if (name.includes('keyboard')) return 'keyboard';
    if (name.includes('mouse')) return 'mouse';
    if (name.includes('chair') || name.includes('seat')) return 'chair';
    if (name.includes('desk') || name.includes('table')) return 'desk';
    if (name.includes('lamp') || name.includes('light')) return 'lighting';
    if (name.includes('furniture') || name.includes('sofa') || name.includes('table')) return 'furniture';
    
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
export const generateProductImage = async (productName, productDescription) => {
  try {
    return await aiImageGenerator.generateProductImage(productName, productDescription);
  } catch (error) {
    console.error('Failed to generate AI image:', error);
    return aiImageGenerator.getFallbackImage(productName);
  }
};
