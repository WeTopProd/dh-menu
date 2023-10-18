import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import Combo from './Combo';
import {api} from "../../api";
import BasketBtn from "../BasketBtn/BasketBtn";

jest.mock("../../api"); // Это издевается над API
jest.mock("../BasketBtn/BasketBtn");

describe("Combo Component", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should render Combo without crashing", async () => {
        const mockData = { results: [{ id: 1, title: 'Test title', weight: 10, description: 'Test description', price: 20, images: [{ images: 'Test image' }] }] }

        api.goodsApi.getList.mockResolvedValue({ data: mockData });

        const { getByText } = render(<Combo data={{}} />);

        // Ждем API
        await waitFor(() => {
            // Утверждает
            expect(api.goodsApi.getList).toHaveBeenCalledTimes(1);
            expect(getByText('Test title')).toBeDefined();
            expect(getByText('10 г.')).toBeDefined();
            expect(getByText('20 руб')).toBeDefined();
        });
    });

    it("should handle failed API calls gracefully", async () => {
        api.goodsApi.getList.mockRejectedValue(new Error('Async error'));

        const { queryByText } = render(<Combo data={{}} />);

        // Ждем API
        await waitFor(() => {
            // Он должен корректно обрабатывать сбой вызова API и не отображать этот текст.
            expect(queryByText('Test title')).toBeNull();
            expect(queryByText('10 г.')).toBeNull();
            expect(queryByText('20 руб')).toBeNull();
        });
    });
});
