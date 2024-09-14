.PHONY: $(MAKECMDGOALS)

clean:
	@rm -rf .next
	@rm -rf coverage
	@rm -rf playwright-report
	@rm -rf test-results
	@rm -rf .swc
	@rm -rf tsconfig.tsbuildinfo
	@rm -rf *.log
