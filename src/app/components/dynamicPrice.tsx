 function calculatePrice(basePrice: number, checkIn: Date, availableSlots: number, totalSlots: number) {
    let price = basePrice;

    // Peak hours (6–9 PM → +20%)
    const hour = checkIn.getHours();
    if (hour >= 18 && hour <= 21) {
      price *= 1.2;
    }

    // Few slots left (< 3 remaining → +30%)
    if (availableSlots < 3) {
      price *= 1.3;
    }

    // Low demand (more than 70% free → -10%)
    if (availableSlots > totalSlots * 0.7) {
      price *= 0.9;
    }

    return Math.round(price);
  }


  export default calculatePrice;