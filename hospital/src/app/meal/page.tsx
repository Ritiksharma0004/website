"use client";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast, ToastContainer } from "react-toastify"; // Ensure react-toastify is installed
import Link from "next/link";

ChartJS.register(ArcElement, Tooltip, Legend);

const PatientDietChart = () => {
  const [newMeal, setNewMeal] = useState({
    time: "",
    meal: "",
    ingredients: [],
    instruction: "",
  });
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredientPercentage, setIngredientPercentage] = useState("");
  const [saved, setSaved] = useState(false);

  const ingredientsList = [
    { name: "Oats", id: 1 },
    { name: "Almond Milk", id: 2 },
    { name: "Banana", id: 3 },
    { name: "Spinach", id: 4 },
    { name: "Tomato", id: 5 },
    // Add more ingredients as needed
  ];

  // Fetch meal plans from localStorage on page load
  useEffect(() => {
    const storedMealPlans = localStorage.getItem("mealPlans");
    if (storedMealPlans) {
      setMealPlans(JSON.parse(storedMealPlans));
    }
  }, []);

  const handleAddIngredient = () => {
    if (selectedIngredient && ingredientPercentage) {
      const newIngredient = {
        name: selectedIngredient,
        percentage: parseFloat(ingredientPercentage),
      };
      setNewMeal((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient],
      }));
      setSelectedIngredient("");
      setIngredientPercentage("");
    } else {
      toast.error("Please select an ingredient and enter a valid percentage.");
    }
  };

  const handleAddMeal = (e) => {
    e.preventDefault();

    if (newMeal.ingredients.length > 0) {
      const updatedMealPlans = [...mealPlans, { ...newMeal }];
      setMealPlans(updatedMealPlans);
      localStorage.setItem("mealPlans", JSON.stringify(updatedMealPlans)); // Save to localStorage
      setNewMeal({ time: "", meal: "", ingredients: [], instruction: "" });
      setSaved(true);
    } else {
      toast.error("Please add at least one ingredient.");
    }
  };

  const handleDeleteMeal = (index) => {
    const updatedMealPlans = mealPlans.filter((_, idx) => idx !== index);
    setMealPlans(updatedMealPlans);
    localStorage.setItem("mealPlans", JSON.stringify(updatedMealPlans)); // Save to localStorage
    saved;
  };

  const getPieChartData = (meal) => {
    const labels = meal.ingredients.map((ingredient) => ingredient.name);
    const data = meal.ingredients.map((ingredient) => ingredient.percentage);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"],
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-sky-100 text-gray-900 p-8">
      <header className="bg-sky-600 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-white">Diet Chart</h2>
        <Link href={"/manager"}>Back to home page</Link>
      </header>

      <main>
        <h3 className="text-lg font-bold text-sky-600 mb-6">Meal Plan for Patients</h3>

        {/* Add New Meal Section */}
        <form onSubmit={handleAddMeal} className="bg-white p-4 rounded-lg shadow-md mb-8">
          <h4 className="text-base font-bold mb-4">Add New Meal</h4>

          <select
            value={newMeal.time}
            onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          >
            <option value="" disabled>
              Select Meal Time
            </option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>

          <input
            type="text"
            placeholder="Meal Name"
            value={newMeal.meal}
            onChange={(e) => setNewMeal({ ...newMeal, meal: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />

          <div className="flex mb-4">
            <select
              value={selectedIngredient}
              onChange={(e) => setSelectedIngredient(e.target.value)}
              className="w-1/2 p-2 border rounded mr-2"
            >
              <option value="" disabled>
                Select Ingredient
              </option>
              {ingredientsList.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.name}>
                  {ingredient.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Percentage"
              value={ingredientPercentage}
              onChange={(e) => setIngredientPercentage(e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
          </div>

          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 mb-4"
          >
            Add Ingredient
          </button>

          <textarea
            placeholder="Instructions"
            value={newMeal.instruction}
            onChange={(e) => setNewMeal({ ...newMeal, instruction: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
          >
            Add Meal
          </button>
        </form>

        {/* Display Meals */}
        <div className="flex flex-wrap gap-4">
          {mealPlans.map((plan, index) => (
            <div key={index} className="mb-4 bg-white p-4 rounded-lg flex  flex-col shadow-md w-1/3">
              <h4 className="text-sm font-bold mb-2">
                {plan.time}: {plan.meal}
              </h4>

              {/* Pie Chart */}
              <div className="h-40 w-full flex justify-center mb-2">
                <Pie data={getPieChartData(plan)} />
              </div>

              <ul className="list-none p-0">
                {plan.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="text-xs">
                    {ingredient.name}: {ingredient.percentage}%
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs">Instruction: {plan.instruction}</p>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteMeal(index)}
                className="bg-red-600 text-white px-4 py-1 rounded mt-2"
              >
                Delete Meal
              </button>
            </div>
          ))}
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};

export default PatientDietChart;
