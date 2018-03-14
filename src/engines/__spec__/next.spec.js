import sinon from 'sinon';
import * as bounds from '../bounds';

import { next } from '../next';

describe('next.js', () => {
  describe('next', () => {
    it('should return undefined selected id if no elements', () => {
      const state = {
        wrapper: { left: 10, top: 10, right: 10, down: 10 },
        marginLeft: 0,
        marginTop: 0,
        elements: [
          { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          { id: '2', coords: { top: 10, left: 10, right: 10, down: 10 } },
        ],
        gap: 0,
        boundedGap: 0,
        topGap: 0,
        leftGap: 0,
      };

      const elements = [];

      const prevElements = [];

      next(elements, prevElements, state, undefined).should.eql({
        selectedId: undefined,
        marginLeft: 0,
        marginTop: 0,
      });
    });

    it('should return next el id', () => {
      const state = {
        wrapper: { left: 10, top: 10, right: 10, down: 10 },
        marginLeft: 0,
        marginTop: 0,
        elements: [
          { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          { id: '2', coords: { top: 10, left: 10, right: 10, down: 10 } },
        ],
        gap: 0,
        boundedGap: 0,
        topGap: 0,
        leftGap: 0,
      };

      const elements = [
        { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
        { id: '2', coords: { top: 10, left: 10, right: 10, down: 10 } },
      ];

      const prevElements = [
        { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
        { id: '2', coords: { top: 10, left: 10, right: 10, down: 10 } },
      ];

      next(elements, prevElements, state, undefined).should.eql({
        selectedId: '1',
        marginLeft: 0,
        marginTop: 0,
      });
    });

    it(
      'should return next el id with updated margins',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 10, down: 10 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            {
              id: '1',
              left: 100,
              coords: { top: 5, left: 5, right: 5, down: 5 },
            },
            { id: '2', coords: { top: 10, left: 10, right: 10, down: 10 } },
          ],
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          leftGap: 0,
          selectedId: '1',
        };

        const elements = [
          { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          { id: '2', coords: { top: 10, left: 10, right: 10, down: 10 } },
        ];

        const prevElements = [
          { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          { id: '2', coords: { top: 10, left: 10, right: 10, down: 10 } },
        ];

        this.stub(bounds, 'correctBoundsMargin').returns({
          marginLeft: 5,
          marginTop: 5,
        });

        next(elements, prevElements, state, undefined).should.eql({
          selectedId: '1',
          marginLeft: 5,
          marginTop: 5,
        });
      })
    );

    it(
      'should return next el id with updated margins',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 10, down: 10 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            {
              id: '1',
              left: 100,
              coords: { top: 5, left: 5, right: 5, down: 5 },
            },
            { id: '2', coords: { top: 10, left: 10, right: 10, down: 10 } },
          ],
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          leftGap: 0,
          selectedId: '1',
        };

        const elements = [
          { id: '2', coords: { top: 10, left: 10, right: 10, down: 10 } },
        ];

        const prevElements = [
          { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          { id: '2', coords: { top: 10, left: 10, right: 10, down: 10 } },
        ];

        this.stub(bounds, 'correctBoundsMargin').returns({
          marginLeft: 5,
          marginTop: 5,
        });

        next(elements, prevElements, state, 'previous').should.eql({
          selectedId: '2',
          marginLeft: 5,
          marginTop: 5,
        });
      })
    );
  });
});
